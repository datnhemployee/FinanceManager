import TypeController from "../controller/TypeController";
import Color from "../styles/Color";

const seedType = [
    {
        name: `Rỗng`,
        isIncome: false,
        color: Color.Gray,
    },
    {
        name: `Mượn`,
        isIncome: false,
        color: '#00BFFF', 
    },
    {
        name: `Ăn uống`,
        isIncome: false,
        color: '#228B22',
    },
    {
        name: `Đi chợ`,
        isIncome: false,
        color: '#CD4F39',
    },
    {
        name: `Mua sắm`,
        isIncome: false,
        color: '#CD00CD',
    },
    {
        name: `Vặt`,
        isIncome: false,
        color: '#FFB5C5',
    },
]

export default async function seed (
    run = false,
) {
    if(run) {
        await seedType.forEach(async (val) => {
            await TypeController.insert(val);
        })
    }
}