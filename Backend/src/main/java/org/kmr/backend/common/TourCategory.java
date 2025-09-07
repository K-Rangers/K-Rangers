package org.kmr.backend.common;

import lombok.Getter;

@Getter
public enum TourCategory {
    Park("공원"),
    Museum("박물관"),
    ThemaPark("테마파크"),
    Market("시장"),
    Temple("사찰"),
    School("학교"),
    SportsFacility("스포츠 시설"),
    CulturalHeritage("문화재"),
    ArtMuseum("미술관"),
    Arboretum("수목원"),
    Attraction("명소"),
    DepartmentStore("백화점"),
    CultureCenter("문화센터"),
    LearningCenter("학습관"),
    ExhibitionHall("전시장"),
    Aquarium("아쿠아리움"),
    Theater("공연예술극장");

    private final String koreanName;
    TourCategory(String koreanName) { this.koreanName = koreanName; }

    public static TourCategory fromString(String str) {
        for (TourCategory category : TourCategory.values()) {
            if (category.getKoreanName().equalsIgnoreCase(str.trim())) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown TourCategory: " + str);
    }
}
