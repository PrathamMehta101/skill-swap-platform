"use client";
import { useState } from "react";

export default function ProfileUploader() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImageUrl(data.secure_url);

    // Optional: Save image URL to DB (via another API route or update your Prisma user model)
    await fetch("/api/update-profile-pic", {
      method: "POST",
      body: JSON.stringify({ imageUrl: data.secure_url }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {imageUrl && (
        <img src={imageUrl} className="h-32 w-32 rounded-full mt-4" />
      )}
    </div>
  );
}
