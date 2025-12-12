export interface TaskFollowUpProps {
  task_id: string;
  comment: string;
  followup_required: string;
  task_followup_date: string;
  planned_followup_date: string;
  assigned_to: string;
  task_priority: string;
  id?: string;
}
