"use client";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface FloorInfo {
  id: number;
  isDubleks: boolean;
  apartmentCount: number;
}

interface ApartmentItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isDubleks: boolean;
  label: string;
  static: boolean;
}

export default function ConstructionVisualizer() {
  // Default kat bilgileri
  const [floors, setFloors] = useState<FloorInfo[]>([
    { id: 1, isDubleks: false, apartmentCount: 4 },
    { id: 2, isDubleks: false, apartmentCount: 4 },
    { id: 3, isDubleks: false, apartmentCount: 4 },
    { id: 4, isDubleks: false, apartmentCount: 4 },
  ]);
  const [layout, setLayout] = useState<ApartmentItem[]>([]);
  const [apartmentCount, setApartmentCount] = useState<number>(4);
  const [showScrollIndicator, setShowScrollIndicator] =
    useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  // Grid boyutlarını hesapla
  const rowHeight = 90;
  // bir kattaki maximum apartman sayısını bulur
  const maxApartmentCount = Math.max(...floors.map((f) => f.apartmentCount), 1);
  const width = maxApartmentCount * 150;

  useEffect(() => {
    const needsScroll = maxApartmentCount > 4 || window.innerWidth < 768;
    setShowScrollIndicator(needsScroll);

    const handleResize = () => {
      const needsScroll = maxApartmentCount > 4 || window.innerWidth < 768;
      setShowScrollIndicator(needsScroll);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxApartmentCount]);

  // Kat sayısını değiştirme
  const handleapartmentCountChange = (newCount: number) => {
    if (newCount < 1 || newCount > 20) return;

    if (newCount > floors.length) {
      // Kat ekle
      const newFloors = [...floors];
      for (let i = floors.length + 1; i <= newCount; i++) {
        newFloors.push({
          id: i,
          isDubleks: false,
          apartmentCount: apartmentCount,
        });
      }
      setFloors(newFloors);
    } else if (newCount < floors.length) {
      // Kat azalt
      setFloors(floors.slice(0, newCount));
    }
  };

  // Katın dubleks durumunu değiştirme
  const toggleFloorDubleks = (floorId: number) => {
    setFloors(
      floors.map((floor) =>
        floor.id === floorId ? { ...floor, isDubleks: !floor.isDubleks } : floor
      )
    );
  };

  // Kattaki daire sayısını güncelleme
  const updateApartmentCount = (floorId: number, count: number) => {
    if (count < 1 || count > 8) return;
    setFloors(
      floors.map((floor) =>
        floor.id === floorId ? { ...floor, apartmentCount: count } : floor
      )
    );
  };

  // Preview modunu değiştirme
  const togglePreviewMode = () => setPreviewMode(!previewMode);

  // Layout oluştur
  useEffect(() => {
    // Bu bölümü tamamen orijinal koddan aldım, hiçbir değişiklik yapmadan
    const newLayout = [];
    let yPosition = 0;

    // Büyükten küçüğe id sıralanır
    const sortedFloors = [...floors].sort((a, b) => b.id - a.id);

    interface ApartmentInfo {
      id: number;
      isDubleks: boolean;
    }

    const apartmentNumbers: Record<string, ApartmentInfo> = {};
    let currentId = 1;

    // Küçükten büyüğe id sıralanır
    const numberedFloors = [...floors].sort((a, b) => a.id - b.id);

    for (let i = 0; i < numberedFloors.length; i++) {
      const floor = numberedFloors[i];

      for (let col = 0; col < floor.apartmentCount; col++) {
        // Her daire için bir key
        const key = `floor-${floor.id}-col-${col}`;
        apartmentNumbers[key] = {
          id: currentId++,
          isDubleks: floor.isDubleks,
        };
      }
    }

    for (let i = 0; i < sortedFloors.length; i++) {
      const floor = sortedFloors[i];

      for (let col = 0; col < floor.apartmentCount; col++) {
        // Aynı anahtarı kullanarak numarayı bul
        const key = `floor-${floor.id}-col-${col}`;
        const apartmentInfo = apartmentNumbers[key];

        if (!apartmentInfo) continue;

        newLayout.push({
          i: `apartment-${apartmentInfo.id}`,
          x: col,
          y: yPosition,
          w: 1,
          h: floor.isDubleks ? 2 : 1,
          isDubleks: floor.isDubleks,
          label: floor.isDubleks
            ? `DUBLEKS ${apartmentInfo.id}`
            : apartmentInfo.id.toString(),
          static: true,
        });
      }

      yPosition += floor.isDubleks ? 2 : 1;
    }

    setLayout(newLayout);
  }, [floors]);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50">
      <div className="bg-slate-200 rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-slate-600 to-slate-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">İnşaat Projesi Görselleştirme</h1>
          <button
            onClick={togglePreviewMode}
            className="bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded flex items-center cursor-pointer"
          >
            {previewMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Düzenle
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Önizleme
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          {previewMode ? (
            // Önizleme modu
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="overflow-x-auto pb-2">
                <div
                  className="relative mx-auto min-w-min"
                  style={{ width: `${width}px` }}
                >
                  <div className="absolute -left-16 top-0 bottom-16 w-12 flex flex-col justify-between">
                    {Array.from({ length: floors.length }).map((_, i) => {
                      const floorNumber = floors.length - i;
                      const floor = floors.find((f) => f.id === floorNumber);

                      if (!floor) return null;

                      return (
                        <div
                          key={floorNumber}
                          className={`flex items-center justify-center ${
                            floor.isDubleks ? "h-[180px]" : "h-[90px]"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-orange-700 text-white flex items-center justify-center shadow-sm">
                            <span className="font-bold">{floorNumber}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <GridLayout
                      className="layout"
                      layout={layout}
                      cols={maxApartmentCount}
                      rowHeight={rowHeight}
                      width={width}
                      isDraggable={false}
                      isResizable={false}
                      compactType={null}
                      preventCollision={true}
                      margin={[10, 10]}
                    >
                      {layout.map((item) => (
                        <div
                          key={item.i}
                          className={`rounded-lg shadow-sm transition-all duration-200 hover:shadow flex flex-col justify-center items-center ${
                            item.isDubleks ? "bg-orange-400 " : "bg-slate-400 "
                          }`}
                        >
                          <div className="text-xl font-bold text-white">
                            {item.label}
                          </div>
                          <div
                            className={`text-sm mt-1 ${
                              item.isDubleks
                                ? "text-amber-50"
                                : "text-orange-50"
                            }`}
                          >
                            {item.isDubleks ? "Dubleks Daire" : "Normal Daire"}
                          </div>
                        </div>
                      ))}
                    </GridLayout>
                  </div>

                  <div className="mt-4 flex justify-center space-x-6 border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-slate-500 rounded-sm mr-2"></div>
                      <span className="text-sm text-gray-700">
                        Normal Daire
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
                      <span className="text-sm text-gray-700">
                        Dubleks Daire
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {showScrollIndicator && (
                <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Tüm daireleri görmek için sağa-sola kaydırın</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            // Düzenleme modu
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="font-semibold text-gray-800 mb-3 border-b border-slate-200 pb-2">
                    Genel Ayarlar
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kat Sayısı
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleapartmentCountChange(floors.length - 1)
                        }
                        disabled={floors.length <= 1}
                        className="bg-orange-700 text-white w-7 h-8 flex items-center justify-center rounded-l-md disabled:bg-gray-300 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={floors.length}
                        onChange={(e) =>
                          handleapartmentCountChange(
                            parseInt(e.target.value) || 1
                          )
                        }
                        min="1"
                        max="20"
                        className="border-y border-gray-300 p-1 w-full text-center focus:outline-none focus:ring-1 focus:ring-orange-300 text-sm"
                      />
                      <button
                        onClick={() =>
                          handleapartmentCountChange(floors.length + 1)
                        }
                        disabled={floors.length >= 20}
                        className="bg-orange-700 text-white w-7 h-8 flex items-center justify-center rounded-r-md disabled:bg-gray-300 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Varsayılan Daire
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          setApartmentCount(Math.max(1, apartmentCount - 1))
                        }
                        disabled={apartmentCount <= 1}
                        className="bg-orange-700 text-white w-7 h-8 flex items-center justify-center rounded-l-md disabled:bg-gray-300 cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={apartmentCount}
                        onChange={(e) =>
                          setApartmentCount(
                            Math.max(
                              1,
                              Math.min(8, parseInt(e.target.value) || 1)
                            )
                          )
                        }
                        min="1"
                        max="8"
                        className="border-y border-gray-300 p-1 w-full text-center focus:outline-none focus:ring-1 focus:ring-orange-300 text-sm"
                      />
                      <button
                        onClick={() =>
                          setApartmentCount(Math.min(8, apartmentCount + 1))
                        }
                        disabled={apartmentCount >= 8}
                        className="bg-orange-700 text-white w-7 h-8 flex items-center justify-center rounded-r-md disabled:bg-gray-300 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Kat Ayarları */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm md:col-span-3">
                  <h2 className="font-semibold text-gray-800 mb-3 border-b border-orange-200 pb-2">
                    Kat Ayarları
                  </h2>
                  <div className="overflow-auto max-h-[300px] border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-orange-700 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider">
                            Kat No
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-white font-semibold uppercase tracking-wider">
                            Daire Sayısı
                          </th>
                          <th className="px-4 py-2 text-left text-xs text-white font-semibold uppercase tracking-wider">
                            Dubleks
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...floors].reverse().map((floor) => (
                          <tr
                            key={floor.id}
                            className={floor.isDubleks ? "bg-amber-50" : ""}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full ${
                                    floor.isDubleks
                                      ? "bg-orange-400 b"
                                      : "bg-orange-700 "
                                  } flex items-center justify-center mr-2`}
                                >
                                  <span className="text-xs font-medium text-white">
                                    {floor.id}
                                  </span>
                                </div>
                                <span className="font-medium text-gray-800">
                                  {floor.id}. Kat
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    updateApartmentCount(
                                      floor.id,
                                      floor.apartmentCount - 1
                                    )
                                  }
                                  disabled={floor.apartmentCount <= 1}
                                  className="text-gray-200 hover:bg-gray-800 bg-gray-600 w-8 h-7 flex items-center justify-center rounded-l-md disabled:bg-gray-100 disabled:text-gray-400 transition-colors cursor-pointer"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={floor.apartmentCount}
                                  onChange={(e) =>
                                    updateApartmentCount(
                                      floor.id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  min="1"
                                  max="8"
                                  className="border border-gray-300 px-1 w-16 text-center focus:outline-none focus:ring-1 focus:ring-orange-300"
                                />
                                <button
                                  onClick={() =>
                                    updateApartmentCount(
                                      floor.id,
                                      floor.apartmentCount + 1
                                    )
                                  }
                                  disabled={floor.apartmentCount >= 8}
                                  className="bg-gray-600 hover:bg-gray-800 text-gray-200 w-8 h-7 flex items-center justify-center rounded-r-md borderdisabled:bg-gray-100 disabled:text-gray-400 transition-colors cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => toggleFloorDubleks(floor.id)}
                                className={`px-4 py-1 w-20 rounded-md text-white text-sm transition-colors cursor-pointer ${
                                  floor.isDubleks
                                    ? "bg-orange-400 hover:bg-orange-300"
                                    : "bg-orange-600 hover:bg-orange-500"
                                } shadow-sm`}
                              >
                                {floor.isDubleks ? "Dubleks" : "Normal"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Binanın Düzenleme modundaki görselleştirmesi */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="overflow-x-auto pb-2">
                  <div
                    className="relative mx-auto min-w-min"
                    style={{ width: `${width}px` }}
                  >
                    <div className="absolute -left-16 top-0 bottom-16 w-12 flex flex-col justify-between">
                      {Array.from({ length: floors.length }).map((_, i) => {
                        const floorNumber = floors.length - i;
                        const floor = floors.find((f) => f.id === floorNumber);

                        if (!floor) return null;

                        return (
                          <div
                            key={floorNumber}
                            className={`flex items-center justify-center ${
                              floor.isDubleks ? "h-[180px]" : "h-[90px]"
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-orange-700 text-white flex items-center justify-center shadow-sm">
                              <span className="font-bold">{floorNumber}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="relative">
                      <GridLayout
                        className="layout"
                        layout={layout}
                        cols={maxApartmentCount}
                        rowHeight={rowHeight}
                        width={width}
                        isDraggable={false}
                        isResizable={false}
                        compactType={null}
                        preventCollision={true}
                        margin={[10, 10]}
                      >
                        {layout.map((item) => (
                          <div
                            key={item.i}
                            className={`rounded-lg shadow-sm transition-all duration-200 hover:shadow flex flex-col justify-center items-center ${
                              item.isDubleks
                                ? "bg-orange-400 "
                                : "bg-slate-400 "
                            }`}
                          >
                            <div className="text-xl font-bold text-white">
                              {item.label}
                            </div>
                            <div
                              className={`text-sm mt-1 ${
                                item.isDubleks
                                  ? "text-amber-50"
                                  : "text-orange-50"
                              }`}
                            >
                              {item.isDubleks
                                ? "Dubleks Daire"
                                : "Normal Daire"}
                            </div>
                          </div>
                        ))}
                      </GridLayout>
                    </div>

                    <div className="mt-4 flex justify-center space-x-6 border-t border-gray-200 pt-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-slate-500 rounded-sm mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Normal Daire
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-400 rounded-sm mr-2"></div>
                        <span className="text-sm text-gray-700">
                          Dubleks Daire
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {showScrollIndicator && (
                  <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span>Tüm daireleri görmek için sağa-sola kaydırın</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
