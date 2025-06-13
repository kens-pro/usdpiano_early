document.addEventListener('DOMContentLoaded', () => {
    // 新品YU11価格データ
    const newYu11Data = [
        { year: 2006, price: 570000 },
        { year: 2018, price: 720000 },
        { year: 2023, price: 814000 },
        { year: 2024, price: 880000 },
    ];

    // 新品YUS1価格データ
    const newYus1Data = [
        { year: 2006, price: 730000 },
        { year: 2018, price: 990000 },
        { year: 2023, price: 1133000 },
        { year: 2024, price: 1210000 },
    ];

   // 中古ピアノ価格データ（新しいモデルに更新）
const usedU1Data = [
  { year: 2022, price: 319000 },
  { year: 2025, price: 374000 },
];

const usedUx3Data = [
  { year: 2022, price: 495000 },
  { year: 2025, price: 550000 },
];


    // Chart.jsのチャートインスタンスを格納するオブジェクト
    const chartInstances = {};

    function createLineChart(canvasId, series1Data, series2Data, series1Label, series2Label) {
        const chartCanvas = document.getElementById(canvasId);
        if (!chartCanvas) {
            console.error(`Canvas element with id "${canvasId}" not found.`);
            return;
        }

        const ctx = chartCanvas.getContext("2d");
        if (!ctx) {
            console.error(`Could not get 2D context for canvas "${canvasId}".`);
            return;
        }

        // 既存のチャートがあれば破棄
        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }

        chartInstances[canvasId] = new Chart(ctx, {
            type: "line",
            data: {
                labels: series1Data.map((d) => d.year.toString()),
                datasets: [
                    {
                        label: series1Label,
                        data: series1Data.map((d) => d.price),
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                        tension: 0.3,
                    },
                    {
                        label: series2Label,
                        data: series2Data.map((d) => d.price),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        tension: 0.3,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => value.toLocaleString() + "円",
                        },
                        title: {
                            display: true,
                            text: "価格（円）",
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "年",
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.dataset.label || "";
                                if (label) {
                                    label += ": ";
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat("ja-JP").format(context.parsed.y) + "円";
                                }
                                return label;
                            },
                        },
                    },
                },
            },
        });
    }

    // 新品ピアノ価格チャートの描画
    createLineChart(
        "newPriceChart",
        newYu11Data,
        newYus1Data,
        "YU11（新品）",
        "YUS1（新品）"
    );

    // 中古ピアノ価格チャートの描画（新しいデータとラベルに更新）
createLineChart(
  "usedPriceChart",
  usedU1Data,       // データを新しいものに変更
  usedUx3Data,      // データを新しいものに変更
  "ヤマハ U1モデル（中古）", // ラベルを新しいものに変更
  "ヤマハ UX3（中古）"      // ラベルを新しいものに変更
);

// ▲▲▲ ここまでが変更箇所です ▲▲▲
});