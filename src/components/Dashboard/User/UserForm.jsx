import { useMemo } from "react";
import Modal from "../../General/Modal";

const UserForm = ({
  title,
  formData,
  handleInputChange,
  handleSubmit,
  handleModalClose,
  editingId,
}) => {
  // const navigate = useNavigate();
  const roles = [
    { id: 1, name: "superadmin" },
    { id: 2, name: "admin" },
    { id: 3, name: "editor" },
    { id: 4, name: "user" },
  ];

  // Validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidBDPhone = (phone) => /^(?:\+8801|01)[3-9]\d{8}$/.test(phone);

  const emailValid =
    isValidEmail(formData.email || "") || formData.email === "";
  const phoneValid =
    isValidBDPhone(formData.phone || "") || formData.phone === "";
  const passwordsMatch =
    (formData.password || "") === (formData.confirmPassword || "") ||
    (formData.confirmPassword || "") === "";

  const isEditMode = useMemo(() => Boolean(editingId), [editingId]);

  return (
    <Modal
      onClose={handleModalClose}
      onSubmit={handleSubmit}
      status="form"
      title={isEditMode ? `Edit ${title}` : `Add ${title}`}
    >
      <div className="px-6 pb-6 pt-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name || ""}
            onChange={handleInputChange}
            required
            className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Email */}
          <>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email || ""}
              onChange={handleInputChange}
              className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                emailValid ? "border-gray-700" : "border-red-500"
              } rounded focus:outline-none ${
                emailValid ? "focus:ring-green-500" : "focus:ring-red-500"
              } focus:ring-2`}
            />
            {!emailValid && (
              <p className="text-xs text-red-500 mt-1 text-left">
                Invalid email address
              </p>
            )}
          </>

          {/* Phone */}
          <>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number (e.g. 017xxxxxxxx)"
              value={formData.phone || ""}
              onChange={handleInputChange}
              className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                phoneValid ? "border-gray-700" : "border-red-500"
              } rounded focus:outline-none ${
                phoneValid ? "focus:ring-green-500" : "focus:ring-red-500"
              } focus:ring-2`}
            />
            {!phoneValid && (
              <p className="text-xs text-red-500 mt-1 text-left">
                Invalid Bangladeshi phone number
              </p>
            )}
          </>

          {/* Role */}
          <select
            name="role_id"
            value={formData.role_id || 4}
            onChange={handleInputChange}
            className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          {/* Password - only in Add mode */}
          {!isEditMode && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={handleInputChange}
                className="px-3 py-2 text-sm bg-[#1F1F1F] text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                className={`px-3 py-2 text-sm bg-[#1F1F1F] text-white border ${
                  passwordsMatch ? "border-gray-700" : "border-red-500"
                } rounded focus:outline-none focus:ring-2 ${
                  passwordsMatch ? "focus:ring-green-500" : "focus:ring-red-500"
                }`}
              />
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 text-left">
                  Passwords do not match
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UserForm;
