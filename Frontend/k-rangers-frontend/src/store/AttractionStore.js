import { create } from "zustand";

const useAttractionStore = create((set) => ({
  districtCode: "ALL",
  features: new Set(),

  setDistrictCode: (code) => set({ districtCode: code || "ALL" }),

  toggleFeature: (key) =>
    set((state) => {
      const next = new Set(state.features);
      next.has(key) ? next.delete(key) : next.add(key);
      return { features: next };
    }),
}));

export default useAttractionStore;
