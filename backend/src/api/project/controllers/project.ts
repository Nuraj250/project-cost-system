/**
 * project controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  // Custom method: GET /projects/:id/cost
  async calculateCost(ctx) {
    const { id } = ctx.params;

    const project:any = await strapi.entityService.findOne('api::project.project', id, {
      populate: ['team_members'],
    });

    if (!project) {
      return ctx.notFound('Project not found');
    }

    const hours = project.hours;
    const team = project.team_members || [];

    // Fetch salaries from team
    const staffCost = team.reduce((sum, member) => {
      const hourly = member.salary / 180;
      return sum + hourly * hours;
    }, 0);

    // Get monthly office expenses
    const expenses = await strapi.entityService.findMany('api::office-expense.office-expense');
    const officeMonthly = expenses.reduce((sum, item:any) => sum + item.amount, 0);
    const officeHourly = (officeMonthly / 180) * hours;

    const totalCost = staffCost + officeHourly;
    const costPerHour = totalCost / hours;

    ctx.send({
      project: project.title,
      hours,
      staff_cost: staffCost,
      office_cost: officeHourly,
      total_cost: totalCost,
      cost_per_hour: +costPerHour.toFixed(2),
    });
  },
}));
