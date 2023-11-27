import { axiosInstance } from '../utils/axios'

export async function getCourses(limit: number, page: number, search: string) {
    try {
        const res = await axiosInstance.get(
            `/course?limit=${limit}&page=${page}&search=${search}`,
        )
        return res.data
    } catch (error) {
        console.log(error)
        return {}
    }
}
