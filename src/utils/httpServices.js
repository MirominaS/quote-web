//async fun
const getService = async(url) => {
    const response = await fetch(url)
    const {data,message,success} = await response.json()
    console.log({data,message,success})    
    return data
} 

export default getService;