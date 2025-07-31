"use client";

import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle } from "lucide-react";

const colorClasses = {
  green: {
    border: "border-green-400 dark:border-green-500",
    background:
      "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20",
    hoverBackground:
      "hover:from-green-100/80 hover:to-emerald-100/80 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30",
    shadow: "hover:shadow-green-500/20",
    icon: "text-green-500 dark:text-green-400",
    iconGlow: "bg-green-500",
    badge:
      "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
  },
  purple: {
    border: "border-purple-400 dark:border-purple-500",
    background:
      "from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20",
    hoverBackground:
      "hover:from-purple-100/80 hover:to-indigo-100/80 dark:hover:from-purple-800/30 dark:hover:to-indigo-800/30",
    shadow: "hover:shadow-purple-500/20",
    icon: "text-purple-500 dark:text-purple-400",
    iconGlow: "bg-purple-500",
    badge:
      "from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600",
  },
};

export default function ImageUploadArea({
  side,
  label,
  image,
  handleFileUpload,
  iconColor = "green",
}) {
  const colors = colorClasses[iconColor];
  const animationDelay =
    iconColor === "purple" ? { animationDelay: "0.5s" } : {};

  return (
    <div className="space-y-3">
      <Label
        htmlFor={side}
        className={`text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2`}
      >
        <Camera className={`h-5 w-5 ${colors.icon}`} />
        {label}
      </Label>
      <div
        className={`border-3 border-dashed border-slate-200 dark:border-slate-600 rounded-2xl p-8 text-center hover:${colors.border} transition-all duration-300 cursor-pointer relative overflow-hidden bg-gradient-to-br ${colors.background} ${colors.hoverBackground} hover:scale-[1.02] shadow-lg hover:shadow-xl ${colors.shadow} group`}
        onClick={() => document.getElementById(`${side}-input`).click()}
      >
        {image ? (
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={label}
                className="w-full h-32 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
            <Badge
              className={`absolute top-2 right-2 bg-gradient-to-r ${colors.badge} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Uploaded
            </Badge>
          </div>
        ) : (
          <>
            <div className="relative mb-4">
              <div
                className={`absolute inset-0 ${colors.iconGlow} rounded-full blur-xl opacity-20 animate-pulse`}
              ></div>
              <Camera
                className={`relative h-10 w-10 ${colors.icon} mx-auto animate-float`}
                style={animationDelay}
              />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Click to upload {side === "obverse" ? "front" : "back"} side
            </p>
          </>
        )}
      </div>
      <input
        id={`${side}-input`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files[0], side)}
      />
    </div>
  );
}
