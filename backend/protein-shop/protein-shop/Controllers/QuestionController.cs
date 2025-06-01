using Microsoft.AspNetCore.Mvc;
using protein_shop.Abstactions;
using protein_shop.Models;

namespace protein_shop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController(IQuestionService _service) : Controller
    {
        
        [HttpPost]
        public async Task<IActionResult> CreateQuestion(QuestionDto questionDto)
        {
            var question = new Question
            {
                Name = questionDto.Name,
                TelOrEmail = questionDto.ContactInfo,
                Message = questionDto.Question
            };
            await _service.CreateQuestion(question);
            return Ok();
        }
    }

    public class QuestionDto
    {
        public string Name { get; set; }
        public string ContactInfo {  get; set; }
        public string Question { get; set; }
    }
}
