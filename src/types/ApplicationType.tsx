export interface Application {
    id: number;
    company_name: string;
    nif: string;
    observations: string;
    company_activity: string;
    smr_1: number;
    smr_2: number;
    dam_1: number;
    dam_2: number;
    daw_1: number;
    daw_2: number;
    modality: string;
    company_id: number;
  }
  
  export interface Company {
    id: number;
    name: string;
    nif: string;
  }
  