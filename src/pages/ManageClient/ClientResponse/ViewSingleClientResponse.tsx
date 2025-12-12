import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { fetchClientResponseById } from "../../../service/clientResponse";
import LoadingPage from "../../Loading/Loading";

export default function ViewSingleClientResponse() {
  const { state } = useLocation();

  const { data: clientResponseData, isLoading } = useQuery({
    queryKey: ["single-client-response-list", state.clientId],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return fetchClientResponseById(id);
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return <div>ViewSingleClientResponse</div>;
}
