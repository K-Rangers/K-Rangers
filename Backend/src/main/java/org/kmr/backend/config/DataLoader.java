package org.kmr.backend.config;

import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.repository.AccommodationRepository;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.TourCategory;
import org.kmr.backend.review.domain.ReviewEntity;
import org.kmr.backend.review.repository.ReviewRepository;
import org.kmr.backend.user.domain.User;
import org.kmr.backend.user.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final AttractionRepository attractionRepository;
    private final AccommodationRepository accommodationRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        User dummyUser = loadUser();
        loadAttractions();
        loadAccommodations();
        loadReviews(dummyUser);
    }

    private User loadUser() {
        if (userRepository.count() > 0) {
            System.out.println("사용자 데이터가 이미 존재합니다.");
            return userRepository.findAll().get(0);
        }
        User user = User.builder()
                .email("user@example.com")
                .password(passwordEncoder.encode("password"))
                .name("더미유저")
                .build();
        userRepository.save(user);
        System.out.println("더미 유저 데이터가 성공적으로 로드되었습니다.");
        return user;
    }

    private void loadReviews(User dummyUser) {
        if (reviewRepository.count() > 0) {
            System.out.println("리뷰 데이터가 이미 존재합니다.");
            return;
        }

        Optional<Attraction> dummyAttractionOpt = attractionRepository.findById(1L);
        Optional<Accommodation> dummyAccommodationOpt = accommodationRepository.findById(1L);

        List<ReviewEntity> reviewsToSave = new ArrayList<>();

        if (dummyAttractionOpt.isPresent()) {
            Attraction dummyAttraction = dummyAttractionOpt.get();
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).attraction(dummyAttraction).content("정말 볼거리가 많고 유익한 시간이었어요. 아이들과 함께 오기 좋네요.").rating(5).build());
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).attraction(dummyAttraction).content("산책하기 좋았지만, 주차장이 조금 협소해서 아쉬웠습니다.").rating(4).build());
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).attraction(dummyAttraction).content("기대했던 것보다는 평범했어요. 한번쯤 가볼만 합니다.").rating(3).build());
        }

        if (dummyAccommodationOpt.isPresent()) {
            Accommodation dummyAccommodation = dummyAccommodationOpt.get();
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).accommodation(dummyAccommodation).content("시설이 정말 깨끗하고 직원분들이 친절해서 편안하게 쉬다 갑니다.").rating(5).build());
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).accommodation(dummyAccommodation).content("위치는 좋은데, 방음이 잘 안되는 것 같아요. 옆방 소리가 들려요.").rating(3).build());
            reviewsToSave.add(ReviewEntity.builder().user(dummyUser).accommodation(dummyAccommodation).content("가성비 좋은 숙소입니다. 다음에도 이용할 의향이 있어요.").rating(4).build());
        }

        if (!reviewsToSave.isEmpty()) {
            reviewRepository.saveAll(reviewsToSave);
            System.out.println(reviewsToSave.size() + "개의 더미 리뷰 데이터가 성공적으로 로드되었습니다.");
        }
    }

    private void loadAttractions() throws Exception {
        if (attractionRepository.count() > 0) {
            System.out.println("관광 명소 데이터가 이미 존재합니다.");
            return;
        }

        List<Attraction> attractionsToSave = new ArrayList<>();
        String csvFilePath = "data/대구광역시_무장애 관광지 정보_20240731.csv";

        try (CSVReader reader = new CSVReader(new InputStreamReader(new ClassPathResource(csvFilePath).getInputStream(), "EUC-KR"))) {
            reader.skip(1);
            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                TourCategory category = TourCategory.fromString(nextLine[12]);
                attractionsToSave.add(
                        new Attraction(
                                nextLine[0],
                                nextLine[1],
                                nextLine[2],
                                nextLine[3],
                                nextLine[4],
                                nextLine[5],
                                nextLine[6],
                                nextLine[7],
                                nextLine[8],
                                nextLine[9],
                                nextLine[10],
                                nextLine[11],
                                category,
                                nextLine[13],
                                nextLine[14]
                        )
                );
            }
        }

        attractionRepository.saveAll(attractionsToSave);
        System.out.println(attractionsToSave.size() + "개의 관광 명소 데이터가 성공적으로 로드되었습니다.");
    }

    private void loadAccommodations() throws Exception {
        if (accommodationRepository.count() > 0) {
            System.out.println("숙박시설 데이터가 이미 존재합니다.");
            return;
        }

        List<Accommodation> accommodationsToSave = new ArrayList<>();
        String csvFilePath = "data/대구광역시_대구 무장애관광숙박시설 정보_20240731.csv";

        try (CSVReader reader = new CSVReader(new InputStreamReader(new ClassPathResource(csvFilePath).getInputStream(), "EUC-KR"))) {
            reader.skip(1);
            String[] nextLine;
            while ((nextLine = reader.readNext()) != null) {
                accommodationsToSave.add(
                        new Accommodation(
                                nextLine[0],
                                nextLine[1],
                                nextLine[2],
                                nextLine[3],
                                nextLine[4],
                                nextLine[5],
                                nextLine[6],
                                nextLine[7],
                                nextLine[8],
                                nextLine[9],
                                nextLine[10],
                                nextLine[11]));
            }
        }

        accommodationRepository.saveAll(accommodationsToSave);
        System.out.println(accommodationsToSave.size() + "개의 숙박시설 데이터가 성공적으로 로드되었습니다.");
    }
}
