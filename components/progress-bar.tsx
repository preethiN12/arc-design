interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                index + 1 <= currentStep
                  ? "bg-rbc-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-400"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="mx-2 h-1 w-16 flex-grow">
                <div className={`h-full ${index + 1 < currentStep ? "bg-rbc-blue-600" : "bg-gray-300"}`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
