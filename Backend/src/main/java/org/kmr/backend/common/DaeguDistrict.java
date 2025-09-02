package org.kmr.backend.common;

import lombok.Getter;

@Getter
public enum DaeguDistrict {
    JUNG_GU("중구"),
    DONG_GU("동구"),
    SEO_GU("서구"),
    NAM_GU("남구"),
    BUK_GU("북구"),
    SUSEONG_GU("수성구"),
    DALSEO_GU("달서구"),
    DALSEONG_GUN("달성군"),
    CHILGOK("칠곡");

    private final String koreanName;

    DaeguDistrict(String koreanName) {
        this.koreanName = koreanName;
    }
}