import Plato from "./Plato";

export async function getPlatosJSONFetch() {
	let urlServer = "http://localhost:3001/api/platos/";
	let response = await fetch(urlServer, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function getPlatosPorIdFetch(id: number) {
	let urlServer = 'http://localhost:3001/api/platos/' + id;
	let response = await fetch(urlServer, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		},
		mode: 'cors'
	});
	console.log(response);
	return await response.json() as Plato;
}

export async function getPlatosPorBusqueda(termino:String){
	let urlServer = 'http://localhost:3001/api/platos/busqueda/'+termino;
	let response = await fetch(urlServer, {
		method: 'GET',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
	console.log(response);
	return await response.json();
}

export async function deletePlatoPorId(id:number){
	console.log("Eliminar Plato ID " + id);
	let urlServer = 'http://localhost:3001/api/platos/'+id;
	await fetch(urlServer, {
		method: 'DELETE',
        headers: {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
		},
        mode: 'cors'
	});
}

export async function savePlato(plato?: Plato) {
	let urlServer = 'http://localhost:3001/api/platos';
	let method:string = "POST";
	if(plato && plato.id > 0){
		urlServer = 'http://localhost:3001/api/platos/'+plato?.id;
		method = "PUT";
	}
	await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(plato),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
}