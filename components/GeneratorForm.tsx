"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, Loader2 } from "lucide-react";
import { GeneratePayload, GenerateResponse } from "@/types";

const schema = z.object({
  field: z.string().min(1, "Please select a field"),
  subdomain: z.string().min(2, "Please enter a sub-domain"),
  interests: z.string().min(10, "Please describe your interests (min 10 characters)"),
  tools: z.array(z.string()).min(1, "Please select at least one tool"),
  degreeLevel: z.enum(["Bachelor's", "Master's", "PhD"]),
});

type FormValues = z.infer<typeof schema>;

const fieldToolsMap: Record<string, string[]> = {
  "Electrical Engineering": ["Simulink", "MATLAB", "PSIM", "LTspice", "Multisim"],
  "Mechanical Engineering": ["SolidWorks", "ANSYS", "AutoCAD", "Abaqus", "CATIA"],
  "Metallurgy & Materials Engineering": ["Thermo-Calc", "CALPHAD", "JMatPro", "FactSage", "COMSOL"],
  "Chemical Engineering": ["Aspen Plus", "COMSOL", "HYSYS", "ProII", "gPROMS"],
  "Computer Science & Engineering": ["Python", "TensorFlow", "PyTorch", "ROS", "OpenCV"],
};

interface Props {
  onLoading: (v: boolean) => void;
  onResults: (v: GenerateResponse | null) => void;
  onError: (v: string | null) => void;
}

export default function GeneratorForm({ onLoading, onResults, onError }: Props) {
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfInfo, setPdfInfo] = useState<{ name: string; pages: number } | null>(null);
  const [paperContext, setPaperContext] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      field: "",
      subdomain: "",
      interests: "",
      tools: [],
      degreeLevel: "Master's",
    },
  });

  const selectedField = watch("field");
  const availableTools = selectedField ? fieldToolsMap[selectedField] ?? [] : [];

  // Reset tools when field changes
  useEffect(() => {
    setValue("tools", []);
  }, [selectedField, setValue]);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
      if (!res.ok) throw new Error("PDF parse failed");

      const data: { text: string; pages: number; truncated: boolean } = await res.json();
      setPaperContext(data.text);
      setPdfInfo({ name: file.name, pages: data.pages });
    } catch {
      onError("Failed to parse PDF. Please try a different file.");
    } finally {
      setPdfUploading(false);
    }
  };

  const removePdf = () => {
    setPdfInfo(null);
    setPaperContext("");
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    onLoading(true);
    onError(null);
    onResults(null);

    const payload: GeneratePayload = {
      ...values,
      paperContext: paperContext || undefined,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err: { error: string } = await res.json();
        throw new Error(err.error || "Unknown error");
      }

      const result: GenerateResponse = await res.json();
      onResults(result);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to generate ideas. Please try again.");
    } finally {
      setSubmitting(false);
      onLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5"
    >
      {/* Field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Engineering Field <span className="text-red-400">*</span>
        </label>
        <select
          {...register("field")}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
        >
          <option value="">Select your field...</option>
          {Object.keys(fieldToolsMap).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        {errors.field && <p className="text-red-400 text-xs mt-1">{errors.field.message}</p>}
      </div>

      {/* Sub-domain */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Sub-domain / Specialization <span className="text-red-400">*</span>
        </label>
        <input
          {...register("subdomain")}
          type="text"
          placeholder="e.g. Power Electronics, Finite Element Analysis"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        {errors.subdomain && <p className="text-red-400 text-xs mt-1">{errors.subdomain.message}</p>}
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Research Interests <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("interests")}
          rows={3}
          placeholder="e.g. solar energy, IoT, deep learning, renewable systems"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
        />
        {errors.interests && <p className="text-red-400 text-xs mt-1">{errors.interests.message}</p>}
      </div>

      {/* Tools */}
      {availableTools.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Available Tools <span className="text-red-400">*</span>
          </label>
          <Controller
            name="tools"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {availableTools.map((tool) => {
                  const checked = field.value.includes(tool);
                  return (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => {
                        if (checked) {
                          field.onChange(field.value.filter((t) => t !== tool));
                        } else {
                          field.onChange([...field.value, tool]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        checked
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-gray-800 border-gray-700 text-gray-400 hover:border-purple-600"
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.tools && <p className="text-red-400 text-xs mt-1">{errors.tools.message}</p>}
        </div>
      )}

      {/* Degree Level */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Degree Level</label>
        <div className="flex gap-3">
          {(["Bachelor's", "Master's", "PhD"] as const).map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={level}
                {...register("degreeLevel")}
                className="accent-purple-500"
              />
              <span className="text-sm text-gray-300">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PDF Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload Research Paper{" "}
          <span className="text-gray-500 font-normal">(optional, PDF)</span>
        </label>

        {pdfInfo ? (
          <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5">
            <span className="text-green-400 text-lg">📄</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{pdfInfo.name}</p>
              <p className="text-gray-500 text-xs">{pdfInfo.pages} pages extracted</p>
            </div>
            <button
              type="button"
              onClick={removePdf}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-3 bg-gray-800 border border-dashed border-gray-700 hover:border-purple-600 rounded-xl px-4 py-4 cursor-pointer transition-colors">
            {pdfUploading ? (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-gray-500" />
            )}
            <span className="text-gray-400 text-sm">
              {pdfUploading ? "Parsing PDF..." : "Click to upload a PDF paper"}
            </span>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              disabled={pdfUploading}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          "🚀 Generate Ideas"
        )}
      </button>
    </form>
  );
}
