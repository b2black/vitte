export default eventHandler(async (event) => {
    const query = getQuery(event);
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const offset = (page - 1) * limit;

    const data = await useDrizzle()
        .select()
        .from(tables.Roles)
        .limit(limit)
        .offset(offset);

    return {
        data,
        meta: {
            page,
            limit,
        },
    };
});
