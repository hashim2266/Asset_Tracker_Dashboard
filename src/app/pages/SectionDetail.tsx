import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Download,
} from "lucide-react";
import { sections as initialSections } from "../data/tasks";

type TaskStatus = "Selesai" | "Dalam Proses" | "Belum Mula";

type Task = {
  id?: string | number;
  bil?: string | number;
  aktiviti?: string;
  status?: TaskStatus | string;
  sasaran?: string | number;
  pencapaian?: string | number;
  peratusan?: number;
  type?: string;
  unit?: string;
};

type Section = {
  id: string | number;
  name?: string;
  fullName?: string;
  tasks?: Task[];
};

type StatusBadgeProps = {
  status?: TaskStatus | string;
};

type ProgressBarProps = {
  value?: number;
};

function StatusBadge({ status = "Belum Mula" }: StatusBadgeProps) {
  const opacity =
    status === "Selesai"
      ? "opacity-100"
      : status === "Dalam Proses"
      ? "opacity-60"
      : "opacity-35";

  const icons: Record<string, JSX.Element> = {
    Selesai: <CheckCircle2 className="size-3" />,
    "Dalam Proses": <Clock3 className="size-3" />,
    "Belum Mula": <AlertCircle className="size-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border text-neon border-neon/40 bg-neon/10 ${opacity}`}
    >
      {icons[status] ?? <AlertCircle className="size-3" />}
      {status}
    </span>
  );
}

function ProgressBar({ value = 0 }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, Number(value || 0)));

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 rounded-full h-1.5 bg-neon/15">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{
            width: `${safeValue}%`,
            background: "linear-gradient(to right, #1a5c38, #00FF88)",
            boxShadow: "0 0 4px rgba(0,255,136,0.6)",
          }}
        />
      </div>

      <span className="text-xs font-bold w-9 text-right text-neon">
        {safeValue}%
      </span>
    </div>
  );
}

export default function SectionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let currentSections: Section[] = initialSections as Section[];

  const savedData = localStorage.getItem("kpi_system_data");

  if (savedData) {
    try {
      currentSections = JSON.parse(savedData) as Section[];
    } catch (error) {
      console.error("Error loading saved data", error);
    }
  }

  const section = currentSections.find((s) => String(s.id) === String(id));

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Seksyen tidak dijumpai.</p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 hover:underline text-sm text-neon"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tasks: Task[] = Array.isArray(section.tasks) ? section.tasks : [];

  const done = tasks.filter((task) => task.status === "Selesai").length;
  const inProg = tasks.filter((task) => task.status === "Dalam Proses").length;
  const notStarted = tasks.filter((task) => task.status === "Belum Mula").length;

  const avg =
    tasks.length > 0
      ? Math.round(
          tasks.reduce((sum, task) => {
            return sum + Number(task.peratusan || 0);
          }, 0) / tasks.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="size-4" />
              Dashboard
            </button>

            <div className="h-5 w-px bg-gray-700" />

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neon">
                {section.name}
              </span>

              <h1 className="text-white font-black text-base leading-tight">
                {section.fullName}
              </h1>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition-colors border border-gray-700"
          >
            <Download className="size-3" />
            Eksport
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            {
              label: "Jumlah Tugasan",
              value: tasks.length,
              opacity: "opacity-100",
            },
            {
              label: "Selesai",
              value: done,
              opacity: "opacity-100",
            },
            {
              label: "Dalam Proses",
              value: inProg,
              opacity: "opacity-65",
            },
            {
              label: "Belum Mula",
              value: notStarted,
              opacity: "opacity-35",
            },
            {
              label: "Purata %",
              value: `${avg}%`,
              opacity: "opacity-100",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl p-4 border bg-neon/8 border-neon/25"
            >
              <p className="text-xs mb-1 text-neon/60">{card.label}</p>

              <p className={`text-3xl font-black text-neon ${card.opacity}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900 rounded-2xl border border-gray-700/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/60 flex items-center justify-between">
            <h2 className="text-white font-bold text-sm">
              Senarai Tugasan — {section.name} ({section.fullName})
            </h2>

            <span className="text-gray-500 text-xs">{tasks.length} rekod</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/60 bg-gray-900/60">
                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider w-12">
                    Bil
                  </th>

                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    Aktiviti / Tugasan
                  </th>

                  <th className="text-center px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider w-24">
                    Sasaran
                  </th>

                  <th className="text-center px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider w-24">
                    Pencapaian
                  </th>

                  <th className="text-left px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider w-48">
                    Peratusan
                  </th>

                  <th className="text-center px-4 py-3 text-gray-400 text-xs font-semibold uppercase tracking-wider w-36">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/60">
                {tasks.map((task, index) => (
                  <tr
                    key={task.id ?? index}
                    className={`hover:bg-gray-700/20 transition-colors ${
                      index % 2 === 0 ? "bg-transparent" : "bg-gray-800/10"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-500 text-xs font-mono">
                      {task.bil ?? index + 1}
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-gray-200 text-xs leading-snug">
                        {task.aktiviti ?? "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="text-gray-300 text-xs font-medium">
                        {task.type === "percentage"
                          ? `${task.sasaran ?? 0}%`
                          : `${task.sasaran ?? 0} ${task.unit ?? ""}`}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="text-white font-bold">
                        {task.pencapaian ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <ProgressBar value={task.peratusan} />
                    </td>

                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={task.status} />
                    </td>
                  </tr>
                ))}z
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}