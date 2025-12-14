import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { addModuleAPI, updatemoduleAPI } from "../../../service/module";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../../component/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BackNavigationButton } from "../../../component/BackNavigationButton";

const initialModuleData = {
  slug: "",
  name: "",
  permission: "",
};

export default function AddModule() {
  const [formData, setFormData] = useState({ ...initialModuleData });
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.data) {
      setFormData({ ...state.data });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // if (name === "permission") {
    //   setFormData({ ...formData, permission: value.split(",") }); // comma separated permissions
    // } else {
    setFormData({ ...formData, [name]: value });
    // }
  };

  const mutation = useMutation({
    mutationFn: addModuleAPI,
    onSuccess: (data) => {
      toast("Module added successfully !");
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["module-list"] });
      setFormData({ ...initialModuleData });
      setIsLoading(false);
    },
    onError: (error: any) => {
      console.error("❌ Error adding client:", error);
      setIsLoading(false);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const editMutation = useMutation({
    mutationFn: updatemoduleAPI,
    onSuccess: (data) => {
      toast("Module Updated successfully !", {
        onClose: () => {
          queryClient.invalidateQueries({ queryKey: ["module-list"] });
          setIsLoading(false);
          navigate("/module");
          setFormData({ ...initialModuleData });
        },
      });
      // invalidate or refresh client list queries
      queryClient.invalidateQueries({ queryKey: ["module-list"] });
      navigate("/module");
      setIsLoading(false);
      setFormData({ ...initialModuleData });
    },
    onError: (error: any) => {
      setIsLoading(false);
      console.error("❌ Error adding client:", error);
      alert(error.response?.data?.message || "Failed to add client");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (pathname === "/editModule") {
      editMutation.mutate(formData);
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-semibold mb-6">Add Module</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Slug Key</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter slug key"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter module name"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Permission</label>
            <textarea
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter permissions (comma separated)"
              rows={4}
            />
          </div>
        </div>
        <div className="flex">
          <Button
            loading={isLoading}
            text={`${pathname === "/editModule" ? "Edit" : "Save"} Module`}
            type="submit"
            className="mt-6 px-6 py-2 bg-[#465dff] text-white rounded-xl hover:bg-blue-600 flex align-middle"
          />
          <BackNavigationButton className="ml-2 mt-6 px-6 py-2  text-white rounded-xl hover:bg-blue-600 flex align-middle" />
        </div>
      </form>
    </div>
  );
}
