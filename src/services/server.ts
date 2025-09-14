// src/services/server.ts
// MirageJS server for mock API

import { createServer, Model, Response } from "miragejs";
import employeesWithPhotos from "../mockEmployees";

export function makeServer() {
  return createServer({
    models: {
      employee: Model,
    },
    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        return schema.all("employee").models;
      });

      this.put("/employees/:id/manager", (schema: any, request: any) => {
        const id = request.params.id;
        const { manager } = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);
        if (employee) {
          employee.update({ manager });
          return employee.attrs;
        }
        return new Response(404, {}, { error: "Employee not found" });
      });
    },
    seeds(server: any) {
      employeesWithPhotos.forEach((emp: any) => {
        server.create("employee", emp);
      });
    },
  });
}
