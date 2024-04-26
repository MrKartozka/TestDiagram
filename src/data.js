export function getData() {
    const tasks = {
        data: [
            {
                id: "10",
                text: "00-260(44)",
                cost: 5400,
                product: "Редуктор_РК-231",
                start_date: "01-04-2025",
                end_date: "05-04-2025",
                order: 10,
                progress: 0.4,
                open: true,
            },
            {
                id: "1",
                text: "020 Токарная",
                Number: "020",
                codeOperation: "4110",
                laborIntensity: "2",
                start_date: "02-04-2025",
                end_date: "03-04-2025",
                order: 10,
                progress: 0.6,
                parent: "10",
            },
            {
                id: "2",
                text: "Pegas 380",
                description: "Фрезерный универсальный станок 5 осей ЧПУ",
                unitPrice: "4000",
                start_date: "01-04-2025",
                end_date: "03-04-2025",
                order: 20,
                progress: 0.6,
                parent: "1",
            },
        ],
        links: [{ id: 1, source: 1, target: 2, type: "0" }],
    };

    return tasks;
}
