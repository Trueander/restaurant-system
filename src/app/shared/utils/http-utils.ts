import {HttpParams} from "@angular/common/http";

export const limpiarParametros = (parametros: any): HttpParams => {
  if (!parametros) {
    return new HttpParams();
  }
  let params = new HttpParams();
  const keys = Object.keys(parametros);
  keys.forEach(key => {
    const valor = parametros[key];
    if (!(valor === null || valor === undefined)) {
      params = params.append(key, valor.toString());
    }
  });
  return params;
}
