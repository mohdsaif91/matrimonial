export interface ActivityLogProps {
  data: ActivityItemProps[];
  links: any;
  meta: any;
}

export interface ActivityItemProps {
  id: string;
  added_by: string;
  client: {
    name: string;
    id: string;
    link: string;
  };
  module: string;
  description: string;
  date: string;
}
