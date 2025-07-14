"use client";

import { getPasswordStrength } from "@/lib/password-validation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const strengthLabels = ["非常に弱い", "弱い", "普通", "強い", "非常に強い"];
const strengthColors = [
  "bg-red-500",
  "bg-orange-500", 
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500"
];

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const strengthIndex = Math.max(0, strength - 1);

  return (
    <div className="mt-2">
      <div className="flex space-x-1 mb-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index <= strengthIndex
                ? strengthColors[strengthIndex]
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <p className={`text-sm ${
          strengthIndex < 2 ? "text-red-600" : 
          strengthIndex < 3 ? "text-yellow-600" : 
          strengthIndex < 4 ? "text-blue-600" : "text-green-600"
        }`}>
          パスワード強度: {strengthLabels[strengthIndex]}
        </p>
      )}
    </div>
  );
}