let token = '3d6bfb9372cfd4912ee410a260723a0bbb1d2a69681e0ffe';

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://pallet-town-api.herokuapp.com/api/speciess`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        } 
        return await response.json()
    },
    create: async(data: any = {}) => {
        const response = await fetch(`https://pallet-town-api.herokuapp.com/api/speciess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to Create new Data on Server')
        }
        return await response.json()
    },
    update: async ( id:string, data:any = {} ) => {
        const response = await fetch(`https://pallet-town-api.herokuapp.com/api/speciess/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async ( id:string ) => {
        const response = await fetch(`https://pallet-town-api.herokuapp.com/api/speciess/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}