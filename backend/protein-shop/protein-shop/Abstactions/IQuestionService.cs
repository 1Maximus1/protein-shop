using protein_shop.Models;

namespace protein_shop.Abstactions
{
    public interface IQuestionService
    {
        Task CreateQuestion(Question question);
    }
}
