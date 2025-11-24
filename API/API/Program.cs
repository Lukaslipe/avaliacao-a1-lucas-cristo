using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(
    options => options.AddPolicy("Acesso Total",
    configs => configs
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "COLOQUE O SEU NOME");

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/chamado/listar
app.MapGet("/api/chamado/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Chamados.Any())
    {
        return Results.Ok(ctx.Chamados.ToList());
    }
    return Results.NotFound("Nenhum chamado encontrada");
});

//POST: http://localhost:5273/api/chamado/cadastrar
app.MapPost("/api/chamado/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Chamado chamado) =>
{
    ctx.Chamados.Add(chamado);
    ctx.SaveChanges();
    return Results.Created("", chamado);
});

//PUT: http://localhost:5273/chamado/alterar/{id}
app.MapPut("/api/chamado/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    //Implementar a alteração do status do chamado

    Chamado? chamadoExistente = ctx.Chamados.Find(id);

    if (chamadoExistente == null)
    {
        return Results.NotFound("Chamado não foi encontrado!");
    }
    
    if (chamadoExistente.Status == "Aberto")
    {
        chamadoExistente.Status = "Em atendimento";
    } 
    else if (chamadoExistente.Status == "Em atendimento")
    {
        chamadoExistente.Status = "Resolvido";
    } else
    {
        chamadoExistente.Status = "Deu errado";
    }

    ctx.Chamados.Update(chamadoExistente);
    ctx.SaveChanges();
    return Results.Ok(chamadoExistente);

});

//GET: http://localhost:5273/chamado/naoconcluidas
app.MapGet("/api/chamado/naoresolvidos", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem dos chamados não resolvidos
    var query = ctx.Chamados.Where(c => c.Status != "Resolvido");
    return query.ToList();

});

//GET: http://localhost:5273/chamado/concluidas
app.MapGet("/api/chamado/resolvidos", ([FromServices] AppDataContext ctx) =>
{
    //Implementar a listagem dos chamados resolvidos
    var query = ctx.Chamados.Where(c => c.Status == "Resolvido");
    return query.ToList();
});

app.UseCors("Acesso Total");

app.Run();
