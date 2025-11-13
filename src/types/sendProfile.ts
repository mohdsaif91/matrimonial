export interface SendProfileProps {
  onClose: () => void;
  data: SendProfileDataProps;
}

interface SendProfileDataProps {
  nameTo: string;
  nameAttach: string;
  mobileTo: string;
  mobileAttached: string;
  imageTo: string;
  imageAttached: string;
  emailTo: string;
  emailAttached: string;
}
