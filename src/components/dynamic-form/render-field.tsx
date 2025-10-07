"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface RenderFieldProps {
  field: any;
  register: any;
  errorMsg?: string;
  watch: any;
  setValue: any;
}

export function RenderField({
  field,
  register,
  errorMsg,
  watch,
  setValue,
}: RenderFieldProps) {
  const value = watch(field.name);
  const [open, setOpen] = useState(false);

  switch (field.type) {
    case "textarea":
      return (
        <div className="space-y-1">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            {...register(field.name)}
          />
          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        </div>
      );

    case "select":
      return (
        <div className="space-y-1">
          <Label>{field.label}</Label>
          <Select onValueChange={(v) => setValue(field.name, v)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Selecione..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={field.name} {...register(field.name)} />
          <Label htmlFor={field.name}>{field.label}</Label>
        </div>
      );

    case "file":
      return (
        <div className="space-y-2">
          <Label>{field.label}</Label>
          <div className="border border-dashed rounded-lg p-6 text-center cursor-pointer">
            <input
              type="file"
              id={field.name}
              accept={field.accept || "image/*"}
              multiple={field.multiple}
              {...register(field.name)}
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                console.log("[files]", files, field.name, value);
                setValue(field.name, field.multiple ? files : files[0]);
              }}
              className="hidden"
            />
            <Label
              htmlFor={field.name}
              className="cursor-pointer text-sm text-gray-500 flex flex-col items-center gap-2"
            >
              <UploadCloudIcon className="w-5 h-5 text-gray-400" />
              Clique para enviar {field.multiple ? "arquivos" : "um arquivo"}
            </Label>

            {value && (
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {Array.isArray(value)
                  ? value.map((file, i) => {
                      const url = URL.createObjectURL(file);
                      return (
                        <Image
                          key={i}
                          width={200}
                          height={200}
                          src={URL.createObjectURL(file)}
                          className="w-20 h-20 rounded-lg object-cover"
                          alt={file.name}
                          onLoad={() => URL.revokeObjectURL(url)}
                        />
                      );
                    })
                  : (() => {
                      const url = URL.createObjectURL(value);
                      return (
                        <Image
                          src={url}
                          width={200}
                          height={200}
                          alt={value.name || "uploaded image"}
                          className="w-20 h-20 rounded-lg object-cover"
                          onLoad={() => URL.revokeObjectURL(url)}
                        />
                      );
                    })()}
              </div>
            )}
          </div>
          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        </div>
      );

    case "date":
      return (
        <div className="space-y-1">
          <Label>{field.label}</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {value ? (
                  format(value, "dd/MM/yyyy")
                ) : (
                  <span>Selecione uma data</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => {
                  setValue(field.name, date);
                  setOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        </div>
      );

    default:
      return (
        <div className="space-y-1">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
          />
          {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        </div>
      );
  }
}
