export async function getAllRegencies() {
    const provRes = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const provinces = await provRes.json();

    const allRegencies: any[] = [];

    for (const prov of provinces) {
        const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`
        );
        const data = await res.json();

        data.forEach((reg: any) => {
            allRegencies.push({
                id: reg.id,
                name: reg.name,
                province_id: prov.id,
                province_name: prov.name,
            });
        });
    }

    return allRegencies;
}
