"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {Camera} from "lucide-react";

export default function AvatarUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    // Trigger file selection
    const handleClick = () => fileInputRef.current?.click();

    // Handle chosen file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    // Upload image to API route
    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setImageUrl(data.filepath || data.url);
            alert("Upload successful ✅");
        } catch (err) {
            console.error(err);
            alert("Upload failed ❌");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col justify-between h-3/4">
            <div className="flex flex-col items-center gap-6">
                <Avatar
                    onClick={handleClick}
                    className="w-32 h-32 cursor-pointer hover:scale-105 transition-transform"
                >
                    {preview || imageUrl ? (
                        <AvatarImage src={preview || imageUrl!} alt="Avatar Preview" />
                    ) : (
                        <AvatarFallback><Camera className="w-6 h-6 opacity-60" /></AvatarFallback>
                    )}
                </Avatar>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <p className="text-sm text-muted-foreground">برای آپلود تصویر کلیک کنید</p>
            </div>

            <Button
                onClick={handleUpload}
                variant="default"
                disabled={!file || uploading}
            >
                {uploading ? "...درحال آپلود" : "آپلود"}
            </Button>
        </div>
    );
}
