import { useState } from "react";
import Files from "./Files";
import Upload from "../components/Upload";

export default function SignedInPanel() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Files", "Upload"];
  const content = [<Files key={10}></Files>, <Upload key={20}></Upload>];

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex space-x-4 border-b">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === idx
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="p-4">
        <div>{content[activeTab]}</div>
      </div>
    </div>
  );
}
