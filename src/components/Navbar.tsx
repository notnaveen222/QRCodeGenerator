import { ArrowUpRight } from "./Icons";

export default function Navbar() {
  return (
    <div className="w-full flex items-center py-7 justify-between relative mb-10">
      <div className="text-xl cursor-pointer font-medium">QRC Gen</div>
      <a
        href="https://github.com/notnaveen222/QRCGenExtension"
        target="_blank"
        className="flex items-center gap-x-1 cursor-pointer"
      >
        <div className="text-lg font-medium">Get Extension</div>
        <div className="size-6">
          <ArrowUpRight className="text-white" />
        </div>
      </a>
    </div>
  );
}

//todo
// on hover, QRC Gen Reveal a QR to redirect to QRC Gen
