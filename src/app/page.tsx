"use client";
import { BinIcon, ColorPicker, UploadIcon } from "@/components/Icons";
import Image from "next/image";
import QRCodeStyling from "qr-code-styling";
import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

const BACKGROUND_COLORS = ["#FFFFFF", "#000000"];
const QR_COLOR = ["#FFFFFF", "#000000"];

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [qrDetails, setQRDetails] = useState({
    logoUrl: "",
    backgroundColor: "#FFFFFF",
    color: "#000000",
  });

  const [bgColor, setBgColor] = useState<string>(qrDetails.backgroundColor);
  const [dotColor, setDotColor] = useState<string>(qrDetails.color);

  const [bgPicker, setBgPicker] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  // click-outside for both pickers
  const bgPickerRef = useRef<HTMLDivElement | null>(null);
  const dotPickerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (bgPickerRef.current && !bgPickerRef.current.contains(target)) {
        setBgPicker(false);
      }
      if (dotPickerRef.current && !dotPickerRef.current.contains(target)) {
        setColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // QR instance + preview URL
  const qrRef = useRef<QRCodeStyling | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [qrBlob, setQrBlob] = useState<Blob | null>(null);
  const [qrName, setQrName] = useState<string>("qr-code");
  const [toast, setToast] = useState<boolean>(false);
  const [toastTitle, setToastTittle] = useState<string>("");
  // init QR instance once
  useEffect(() => {
    qrRef.current = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: " ", // Initialize with empty space, will be updated in handleQrGenerate
      qrOptions: { errorCorrectionLevel: "M" },
      dotsOptions: { color: "#000000" },
      backgroundOptions: { color: "#FFFFFF" },
      imageOptions: { crossOrigin: "anonymous", margin: 20, imageSize: 0.25 },
    });

    return () => {
      setQrUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return "";
      });
    };
  }, []);

  const handleQrGenerate = async () => {
    const data = inputText.trim();
    if (!data) return;

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data,
      qrOptions: { errorCorrectionLevel: "M" },
      dotsOptions: { color: qrDetails.color },
      backgroundOptions: { color: qrDetails.backgroundColor },
      image: qrDetails.logoUrl || undefined,
      imageOptions: { crossOrigin: "anonymous", margin: 20, imageSize: 0.25 },
    });

    const blob = await qr.getRawData("png");
    const url = URL.createObjectURL(blob as Blob);
    setQrBlob(blob as Blob);
    setQrUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setQRDetails((prev) => ({
  //       ...prev,
  //       logoUrl: URL.createObjectURL(file),
  //     }));
  //   }
  // };
  const handleQrDownload = () => {
    if (!qrBlob) return;
    const qrCodeName = qrName.trim() == "" ? "qr-code" : qrName;
    const url = URL.createObjectURL(qrBlob as Blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${qrCodeName}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setToastTittle("QR Code Downlaoded");
    showToast();
    URL.revokeObjectURL(url);
  };
  const handleQrCopy = async () => {
    if (!qrBlob) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": qrBlob,
        }),
      ]);
    } catch (err) {
      console.error("Copy failed", err);
    } finally {
      setToastTittle("QR Code Copied");
      showToast();
    }
  };
  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col grow h-full">
      <input
        className="focus:outline-none font-medium text-lg input-box border-b border-b-white/20 focus:border-b-white transition-all duration-150 ease-out mb-5"
        placeholder="Enter Input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="text-white font-medium flex flex-col gap-y-2">
        <div className="text-lg mb-2">
          Options{" "}
          <span className="text-white/60 text-sm">( More Coming Soon )</span>
        </div>

        {/* Background Color */}
        <div className="flex items-center justify-between ">
          <div>Background Color</div>
          <div className="flex gap-x-2 items-center">
            {BACKGROUND_COLORS.map((color, index) => {
              const selected =
                qrDetails.backgroundColor.toLowerCase() === color.toLowerCase();
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`rounded-full w-7 h-7 cursor-pointer ${
                    selected ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => {
                    setQRDetails((p) => ({ ...p, backgroundColor: color }));
                    setBgColor(color);
                  }}
                />
              );
            })}

            <div
              className="text-white w-[75px] flex justify-center rounded-lg px-2"
              style={{ backgroundColor: bgColor }}
            >
              {bgColor}
            </div>

            <div
              className="size-5 flex justify-center items-center relative rounded-full h-7 w-7"
              onClick={() => setBgPicker((prev) => !prev)}
            >
              <div className="size-[19px]">
                <ColorPicker />
              </div>
              {bgPicker && (
                <div
                  ref={bgPickerRef}
                  className="absolute z-10 mt-2 p-3 rounded shadow bg-white text-black"
                >
                  <HexColorPicker
                    color={bgColor}
                    onChange={(hex) => {
                      setBgColor(hex);
                      setQRDetails((p) => ({ ...p, backgroundColor: hex }));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dots Color */}
        <div className="flex items-center justify-between ">
          <div>Dots Color</div>
          <div className="flex gap-x-2 items-center">
            {QR_COLOR.map((c, idx) => {
              const selected =
                qrDetails.color.toLowerCase() === c.toLowerCase();
              return (
                <div
                  key={idx}
                  style={{ backgroundColor: c }}
                  className={`rounded-full w-7 h-7 cursor-pointer ${
                    selected ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => {
                    setQRDetails((p) => ({ ...p, color: c }));
                    setDotColor(c);
                  }}
                />
              );
            })}

            <div
              className="text-white w-[75px] rounded-lg flex justify-center"
              style={{ backgroundColor: dotColor }}
            >
              {dotColor}
            </div>

            <div
              className="size-5 flex justify-center items-center relative rounded-full h-7 w-7"
              onClick={() => setColorPicker((prev) => !prev)}
            >
              <div className="size-[19px]">
                <ColorPicker />
              </div>
              {colorPicker && (
                <div
                  ref={dotPickerRef}
                  className="absolute z-10 mt-2 p-3 rounded shadow bg-white text-black"
                >
                  <HexColorPicker
                    color={dotColor}
                    onChange={(hex) => {
                      setDotColor(hex);
                      setQRDetails((p) => ({ ...p, color: hex }));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="">QR Name</div>
          <div>
            <input
              placeholder="qr-code"
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
              className="focus:outline-none font-medium text-lg input-box border-b border-b-white/20 focus:border-b-white transition-all duration-150 ease-out "
            />
          </div>
        </div>
      </div>
      {/* Generate button */}
      <button
        onClick={handleQrGenerate}
        className="text-center cursor-pointer font-medium my-5 w-fit mx-auto border border-white/10 rounded-lg px-3 py-0.5 hover:border-white/50 transition-all duration-250 ease-out text-lg mb-10"
      >
        Generate
      </button>

      {/* Preview box */}
      <div className="h-[300px] w-[300px] flex items-center justify-center border border-white mx-auto ">
        {qrUrl ? (
          <Image
            src={qrUrl}
            alt="Generated QR"
            width={300}
            height={300}
            unoptimized
            className="rounded"
            priority
          />
        ) : (
          <span className="text-sm font-medium">Your QR will appear here</span>
        )}
      </div>
      <div className="flex justify-between  w-fit mx-auto gap-x-[133px]  items-center">
        <button
          disabled={qrBlob == null}
          className={`text-center font-medium my-5 w-fit mx-auto border border-white/10 rounded-lg px-3 py-0.5  transition-all duration-250 ease-out text-lg mb-10 ${
            qrBlob != null
              ? "cursor-pointer hover:border-white/50"
              : "cursor-default "
          }`}
          onClick={handleQrDownload}
        >
          Download
        </button>
        <button
          disabled={qrBlob == null}
          className={`text-center font-medium my-5 w-fit mx-auto border border-white/10 rounded-lg px-3 py-0.5  transition-all duration-250 ease-out text-lg mb-10 ${
            qrBlob != null
              ? "cursor-pointer hover:border-white/50"
              : "cursor-default "
          }`}
          onClick={handleQrCopy}
        >
          Copy
        </button>
      </div>
      <Toast showToast={toast} title={toastTitle} />
    </div>
  );
}

function Toast({ showToast, title }: { showToast: boolean; title: string }) {
  return (
    <div
      className={`fixed w-full left-0  text-center transition-all duration-150 ease-out  flex justify-center ${
        showToast ? "bottom-10 " : "-bottom-10 "
      }`}
    >
      <div className="bg-white text-black font-medium px-3 py-1 w-fit rounded-lg ">
        {title}
      </div>
    </div>
  );
}
