export interface Step {
  uid: string;
  title: string;
  description: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  requiredMechanismsId?: string[];
  requiredPosition?: google.maps.LatLngLiteral;
  unlockedItemsId: string[];
  unlockedMechanismsId: string[];
  unlockedMarkersId: string[];
  unlockedStepsId: string[];
}
