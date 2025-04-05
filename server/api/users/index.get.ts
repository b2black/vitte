import { eq } from "drizzle-orm";

export default eventHandler(async () => {
    return useDrizzle().select({
        id: tables.Users.id,
        first_name: tables.Users.first_name,
        last_name: tables.Users.last_name,
        email: tables.Users.email,
        role_id: tables.Users.role_id,
        role_alias: tables.Roles.alias,
        role_name: tables.Roles.name,
    }).from(tables.Users).limit(10).leftJoin(tables.Roles, eq(tables.Users.role_id, tables.Roles.id));
});
