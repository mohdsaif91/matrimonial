export interface TaskProps {
  title: string;
  task_category_id: number;
  assigned_to: number;
  scheduled_on: string | Date;
  priority: string;
  id?: 3;
  category?: CategoryTaskProps;
  created_at?: "2025-10-21";
}

export interface CategoryTaskProps {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TaskFilterProps {
  onSubmit: () => void;
  showAddTaskBtn: boolean;
  data: any;
  setData: (e: any) => void;
}
