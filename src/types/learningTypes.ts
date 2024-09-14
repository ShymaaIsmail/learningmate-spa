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
    id: number;                // Unique identifier for the learning plan
    name: string;              // Name of the learning plan
    title: string;             // Title of the learning plan
    start_date: string;        // Start date of the learning plan (ISO date string)
    end_date: string;          // End date of the learning plan (ISO date string)
    description: string;       // Description of the learning plan
    course_links: string[];    // List of course links related to the learning plan (JSON field)
    created_at: string;        // Timestamp when the learning plan was created (ISO date string)
    updated_at: string;        // Timestamp when the learning plan was last updated (ISO date string)
    user: number;
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
