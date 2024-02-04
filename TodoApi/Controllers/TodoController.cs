using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Data;
using TodoApi.Model;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;

        public TodoController(ApplicationDbContext DbContext)
        {
            _dbContext = DbContext;
        }

        [HttpGet]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult GetTodos()
        {
            var todos = _dbContext.todos.ToList();
            if (todos.Count > 0)
            {
                return Ok(todos);

            }

            return NotFound();
        }

        [HttpGet("id:int")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult Get(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            var todo = _dbContext.todos.Find(id);
            if (todo is null)
            {
                return NotFound("Todo is not Found");

            }

            return Ok(todo);
        }

        [HttpPost]
        public ActionResult Create(Todo todo)
        {
            if (ModelState.IsValid)
            {
                _dbContext.todos.Add(todo);
                _dbContext.SaveChanges();
                return Ok(todo);
            }
            return BadRequest();
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult Delete(int id)
        {
            var todo = _dbContext.todos.Find(id);

            if (todo is null)
            {
                return NotFound("Todo is not Found");
            }

            _dbContext.todos.Remove(todo);
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 400)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult Update(int id, Todo updatedTodo)
        {
            if (id == 0 || id != updatedTodo.TodoId)
            {
                return BadRequest("Invalid ID");
            }

            var existingTodo = _dbContext.todos.Find(id);

            if (existingTodo is null)
            {
                return NotFound("Todo is not Found");
            }

            existingTodo.Title = updatedTodo.Title;
            existingTodo.Description = updatedTodo.Description;
            existingTodo.IsFinished = updatedTodo.IsFinished;

            _dbContext.SaveChanges();

            return Ok(existingTodo);

        }
    }
}
