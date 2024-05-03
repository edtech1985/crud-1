export interface Filters {

    modelType?:
    | "loiras"
    | "morenas"
    | "ruivas"
    | "orientais"
    | "negras"
    | "mulatas"
    | "duplas"
    | "indiferente"
    | "";
  showFace?: "sim" | "não" | "indiferente";

    alturaMin?: string;
  alturaMax?: string;

  hourlyRate?: string;
  quarterHourlyRate?: string;
  halfHourlyRate?: string;

  minHeight?: string;
  maxHeight?: string;

  bust?: "silicone" | "natural" | "indiferente";
  eyes?: "azuis" | "verdes" | "castanhos" | "mel" | "indiferente";

  minFeet?: string;
  maxFeet?: string;

  hasLocation?: boolean;

  services?: "Hotéis" | "Motéis" | "A domicílio" | "Virtual" | "Indiferente";

  avaibleForTravel?: boolean;

  virtualServices?: boolean;
}
