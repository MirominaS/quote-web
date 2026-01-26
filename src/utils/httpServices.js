//async fun
export const getService = async(url) => {
    const response = await fetch(url)
    const {data,message,success} = await response.json()
    console.log({data,message,success})    
    return data
    
} 

export const postService = async(url,body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
    };
    
    try {
        const response = await fetch(url,requestOptions)
        const {data,message,success} = await response.json()
        console.log({data,message,success})
        return {data,message,success}
        
    } catch (error) {
        console.log("Error:",error)
    }
}