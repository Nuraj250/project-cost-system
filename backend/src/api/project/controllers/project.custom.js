'use strict';

module.exports = {
  async calculateCost(ctx) {
    const projectId = ctx.params.id;

    const project = await strapi.entityService.findOne('api::project.project', projectId, {
      populate: { team: true },
    });

    if (!project) {
      return ctx.notFound("Project not found");
    }

    const hours = project.hours;

    const staffCost = project.team.reduce((total, member) => {
      const hourly = member.monthlySalary / 180;
      return total + (hourly * hours);
    }, 0);

    const expenses = await strapi.entityService.findMany('api::office-expense.office-expense');

    const totalMonthlyOfficeCost = expenses.reduce((sum, exp) => sum + exp.monthlyCost, 0);
    const officeHourly = totalMonthlyOfficeCost / 180;
    const officeCost = officeHourly * hours;

    const totalCost = staffCost + officeCost;
    const costPerHour = totalCost / hours;

    ctx.send({
      project: project.title,
      hours,
      staff_cost: parseFloat(staffCost.toFixed(2)),
      office_cost: parseFloat(officeCost.toFixed(2)),
      total_cost: parseFloat(totalCost.toFixed(2)),
      cost_per_hour: parseFloat(costPerHour.toFixed(2))
    });
  }
};
