import { CheckIcon } from "./icons";

const STEPS = [
  { number: 1, label: "Cart Review" },
  { number: 2, label: "Shipping Details" },
  { number: 3, label: "Payment Summary" },
];

export default function CheckoutSteps({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? <CheckIcon className="w-4 h-4" /> : step.number}
              </div>
              <span
                className={`text-xs mt-1 font-medium whitespace-nowrap ${
                  isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {index < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-colors ${
                  currentStep > step.number ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
