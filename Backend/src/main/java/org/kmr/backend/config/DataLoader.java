package org.kmr.backend.config;

import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;
import org.kmr.backend.accommodation.domain.Accommodation;
import org.kmr.backend.accommodation.repository.AccommodationRepository;
import org.kmr.backend.attraction.domain.Attraction;
import org.kmr.backend.attraction.repository.AttractionRepository;
import org.kmr.backend.common.TourCategory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationRunner {

    private final AttractionRepository attractionRepository;
    private final AccommodationRepository accommodationRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        loadAttractions();
        loadAccommodations();
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
                accommodationsToSave.add(new Accommodation(nextLine[0], nextLine[1]));
            }
        }

        accommodationRepository.saveAll(accommodationsToSave);
        System.out.println(accommodationsToSave.size() + "개의 숙박시설 데이터가 성공적으로 로드되었습니다.");
    }
}