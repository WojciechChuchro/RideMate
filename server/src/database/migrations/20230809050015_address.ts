import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.string('zipCode');
        table.string('houseNumber');
        table.float('gpsX')
        table.float('gpsY')
        table.integer("streetId")
            .unsigned()
            .references("id")
            .inTable("street")
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('address');
}
