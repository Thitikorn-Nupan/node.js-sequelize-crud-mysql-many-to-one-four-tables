const {afterEach, beforeEach, describe, it, mock} = require("node:test")
const assert = require("node:assert/strict")

const CrudProjects = require("../crud/crud-projects")
const project = require("../entities/projects")
const programmer = require("../entities/programmer/programmer")
const sale = require("../entities/sale/sale")
const marketing = require("../entities/marketing/marketing")

describe("crud-projects.js (isolated unit test)", () => {
    let crudProjects

    beforeEach(() => {
        crudProjects = new CrudProjects()
    })

    afterEach(() => {
        // Restore every model method so one test cannot affect the next test.
        mock.restoreAll()
    })

    it("reads all projects with their related headers", async () => {
        const projects = [{project_name: "CRM", project_cost: 1000}]

        // Replace project.findAll with a fake async function that returns the
        // projects fixture, so crudProjects.reads() can be tested without
        // sending a SELECT query to the real database. The returned mock
        // keeps its call history, which lets the assertions verify the ORM
        // options passed by the CRUD method.
        const findAll = mock.method(project, "findAll", async () => projects)

        // The success path returns the ORM result and requests all three relations.
        const result = await crudProjects.reads()

        assert.deepEqual(result, projects)
        assert.deepEqual(findAll.mock.calls[0].arguments[0], {
            include: [programmer, sale, marketing],
            attributes: {exclude: ["p_id", "s_id", "m_id"]}
        })
        // mock call await project.findAll({
        //                 include: [programmer,sale,marketing] , // include three tables (programmer == header_programmers , sale == header_sales , marketing == header_marketings)
        //                 attributes : {exclude:['p_id','s_id','m_id']} // ignore some columns from projects table
        //             })
    })

    it("reads one project by its primary key", async () => {
        const projectRecord = {project_name: "CRM", project_cost: 1000}
        const findByPk = mock.method(project, "findByPk", async () => projectRecord)

        // A successful read forwards the project name and keeps the same header includes.
        const result = await crudProjects.read("CRM")

        assert.deepEqual(result, projectRecord)
        assert.deepEqual(findByPk.mock.calls[0].arguments, [
            "CRM",
            {
                include: [programmer, sale, marketing],
                attributes: {exclude: ["p_id", "s_id", "m_id"]}
            }
        ])
    })

    it("creates a project after all related headers are found", async () => {
        const createResult = {project_name: "CRM"}
        const saleFindByPk = mock.method(sale, "findByPk", async () => ({s_id: 1}))
        const programmerFindByPk = mock.method(programmer, "findByPk", async () => ({p_id: 2}))
        const marketingFindByPk = mock.method(marketing, "findByPk", async () => ({m_id: 3}))
        const create = mock.method(project, "create", async () => createResult)

        // The create path validates each foreign key before inserting the project.
        const result = await crudProjects.create("CRM", 1000, "2026-01-01", true, 2, 1, 3)

        assert.deepEqual(result, createResult)
        assert.deepEqual(saleFindByPk.mock.calls[0].arguments, [1])
        assert.deepEqual(programmerFindByPk.mock.calls[0].arguments, [2])
        assert.deepEqual(marketingFindByPk.mock.calls[0].arguments, [3])
        assert.deepEqual(create.mock.calls[0].arguments, [{
            project_name: "CRM",
            project_cost: 1000,
            project_build: "2026-01-01",
            project_status: true,
            p_id: 2,
            s_id: 1,
            m_id: 3
        }])
    })

    it("deletes a project by name", async () => {
        const destroy = mock.method(project, "destroy", async () => 1)

        // The success path passes the requested name as the delete condition.
        const result = await crudProjects.delete("CRM")

        assert.equal(result, 1)
        assert.deepEqual(destroy.mock.calls[0].arguments, [{where: {project_name: "CRM"}}])
    })

    it("updates an existing project", async () => {
        const findAll = mock.method(project, "findAll", async () => [{project_name: "CRM"}])
        const update = mock.method(project, "update", async () => [1])

        // An existing project is updated and the CRUD method reports the success status.
        const result = await crudProjects.update("CRM v2", 1200, false, "CRM")

        assert.equal(result, "updated")
        assert.deepEqual(findAll.mock.calls[0].arguments, [{where: {project_name: "CRM"}}])
        assert.deepEqual(update.mock.calls[0].arguments, [
            {project_name: "CRM v2", project_cost: 1200, project_status: false},
            {where: {project_name: "CRM"}}
        ])
    })

    it("updates a project and its related headers", async () => {
        const findAll = mock.method(project, "findAll", async () => [{project_name: "CRM"}])
        const saleFindByPk = mock.method(sale, "findByPk", async () => ({s_id: 1}))
        const programmerFindByPk = mock.method(programmer, "findByPk", async () => ({p_id: 2}))
        const marketingFindByPk = mock.method(marketing, "findByPk", async () => ({m_id: 3}))
        const update = mock.method(project, "update", async () => [1])

        // Header validation happens before the project row is updated with new foreign keys.
        const result = await crudProjects.updateHeader("CRM", 2, 1, 3, "CRM v2", 1200, true)

        assert.equal(result, "updated")
        assert.deepEqual(findAll.mock.calls[0].arguments, [{where: {project_name: "CRM"}}])
        assert.deepEqual(saleFindByPk.mock.calls[0].arguments, [1])
        assert.deepEqual(programmerFindByPk.mock.calls[0].arguments, [2])
        assert.deepEqual(marketingFindByPk.mock.calls[0].arguments, [3])
        assert.deepEqual(update.mock.calls[0].arguments, [
            {
                project_name: "CRM v2",
                project_cost: 1200,
                project_status: true,
                p_id: 2,
                s_id: 1,
                m_id: 3
            },
            {where: {project_name: "CRM"}}
        ])
    })
})