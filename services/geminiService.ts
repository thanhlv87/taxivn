
import { GoogleGenAI, Type } from "@google/genai";
import { TaxiData, Taxi } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const taxiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        locationName: {
            type: Type.STRING,
            description: 'Tên thành phố hoặc tỉnh bằng tiếng Việt được xác định từ tọa độ, ví dụ: "Thành phố Hồ Chí Minh" hoặc "Hà Nội".',
        },
        taxis: {
            type: Type.ARRAY,
            description: 'Danh sách các hãng taxi.',
            items: {
                type: Type.OBJECT,
                properties: {
                    name: {
                        type: Type.STRING,
                        description: 'Tên hãng taxi, ví dụ: "Mai Linh" hoặc "Vinasun".',
                    },
                    phone: {
                        type: Type.STRING,
                        description: 'Số điện thoại tổng đài của hãng taxi, ví dụ: "1055" hoặc "02838272727".',
                    },
                    logoUrl: {
                        type: Type.STRING,
                        description: 'URL đến logo của hãng taxi. Chuỗi rỗng nếu không có.',
                    },
                },
                required: ['name', 'phone'],
            },
        },
    },
    required: ['locationName', 'taxis'],
};

export const fetchTaxisByLocation = async (latitude: number, longitude: number): Promise<TaxiData> => {
    try {
        const prompt = `Dựa trên vị trí có vĩ độ ${latitude} và kinh độ ${longitude}, hãy xác định tên thành phố hoặc tỉnh chính ở Việt Nam. Sau đó, liệt kê khoảng 5-7 hãng taxi phổ biến nhất đang hoạt động trong khu vực đó. Với mỗi hãng, vui lòng cung cấp: tên hãng, một số điện thoại chính để đặt xe, và một URL công khai có thể truy cập được cho logo của họ. Nếu không tìm thấy logo, hãy trả về một chuỗi rỗng cho logoUrl.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: taxiResponseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        // Basic validation
        if (!parsedData.locationName || !Array.isArray(parsedData.taxis)) {
             throw new Error("Invalid data structure from API.");
        }

        return parsedData as TaxiData;

    } catch (error) {
        console.error("Error fetching taxi data from Gemini API:", error);
        if (error instanceof Error) {
             throw new Error(`Failed to fetch taxi data: ${error.message}`);
        }
        throw new Error("An unknown error occurred while fetching taxi data.");
    }
};

export const fetchTaxisByProvinceName = async (provinceName: string): Promise<TaxiData> => {
    try {
        const prompt = `Dựa trên tên tỉnh/thành phố "${provinceName}" ở Việt Nam, hãy liệt kê khoảng 5-7 hãng taxi phổ biến nhất đang hoạt động trong khu vực đó. Với mỗi hãng, vui lòng cung cấp: tên hãng, một số điện thoại chính để đặt xe, và một URL công khai có thể truy cập được cho logo của họ. Nếu không tìm thấy logo, hãy trả về một chuỗi rỗng cho logoUrl.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: taxiResponseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);

        if (!parsedData.locationName || !Array.isArray(parsedData.taxis)) {
             throw new Error("Invalid data structure from API.");
        }

        // Override locationName for UI consistency, as the model might return a variant.
        parsedData.locationName = provinceName;

        return parsedData as TaxiData;

    } catch (error) {
        console.error(`Error fetching taxi data for ${provinceName} from Gemini API:`, error);
        if (error instanceof Error) {
             throw new Error(`Failed to fetch taxi data for ${provinceName}: ${error.message}`);
        }
        throw new Error(`An unknown error occurred while fetching taxi data for ${provinceName}.`);
    }
};
