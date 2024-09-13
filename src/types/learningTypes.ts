export interface LearningCategory {
    id: number;
    name: string;
  }
export interface Course  {
    id: number;
    title: string;
    url: string;
    price: string;
    image_480x270: string;
    headline: string;
    source: string;
  };
  
  export interface LearningPlan  {
    id: number;
    title: string;
    url: string;
    price: string;
    image_480x270: string;
    description: string;
    source: string;
  };
  export interface PaginatedLearningPlan  {
    plans: LearningPlan[];
    totalPages: number;
  }

 export interface LearningPlansProps {
    paginatedPlans: PaginatedLearningPlan | null;
    loading: boolean;
    error: string | null;
    onEdit: (planId: number) => void; // Function to handle editing a plan
    onDelete: (planId: number) => void; // Function to handle deleting a plan
    onAdd: () => void; // Function to handle adding a new plan
    currentPage: number; // Current page number
    totalPages: number; // Total number of pages
    onPageChange: (page: number) => void; // Function to handle page changes
  }
