import { useState } from "react";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!values.city.trim()) {
    errors.city = "City is required.";
  }

  if (!values.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  }

  return errors;
}

export default function ShippingForm({ initialValues = INITIAL_VALUES, onSubmit, onBack }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  }

  const fields = [
    { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
    { name: "email", label: "Email", type: "email", placeholder: "john@example.com" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 555 000 0000" },
    { name: "address", label: "Address", type: "text", placeholder: "123 Main St" },
    { name: "city", label: "City", type: "text", placeholder: "New York" },
    { name: "postalCode", label: "Postal Code", type: "text", placeholder: "10001" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.name === "address" ? "sm:col-span-2" : ""}>
            <label
              htmlFor={`shipping-${field.name}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              id={`shipping-${field.name}`}
              type={field.type}
              name={field.name}
              value={values[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors[field.name] ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors[field.name] && (
              <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          id="shipping-next-btn"
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Continue to Summary
        </button>
      </div>
    </form>
  );
}
