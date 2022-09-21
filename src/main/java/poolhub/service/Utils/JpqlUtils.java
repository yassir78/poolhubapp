package poolhub.service.Utils;

import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

public class JpqlUtils {

    private static Logger logger = Logger.getLogger(JpqlUtils.class.getName());

    public static String init(Class<?> clazz) {
        return "SELECT item From " + clazz.getSimpleName() + " item where 1=1 ";
    }

    public static String addCriteria(String key, Object valueMin, Object valueMax) {
        String query = addCriteria(key, valueMin, ">=");
        query += addCriteria(key, valueMax, "<=");
        return query;
    }

    public static String addCriteria(String key, List<String> values) {
        if (Objects.isNull(values) || values.isEmpty()) {
            return "";
        }
        StringBuilder query = new StringBuilder("AND ( ");
        for (String value : values.stream().filter(Objects::nonNull).toList()) {
            query.append("item.").append(key).append(" LIKE '%").append(value).append("%' ");
            if (values.indexOf(value) != values.size() - 1) {
                query.append("OR ");
            }
        }
        query.append(" )");
        return query.toString();
    }

    public static String addCriteria(String key, Object value, String operator) {
        if (value != null && !value.toString().isEmpty()) {
            if (value instanceof String && operator.equals("LIKE")) {
                return " AND item." + key + " " + operator + " '%" + value + "%'";
            }
            return " AND item." + key + " " + operator + " " + value;
        }
        return "";
    }

    public static String addOrderBy(String key, String order) {
        if (key != null && !key.isEmpty()) {
            return " ORDER BY item." + key + " " + order;
        }
        return "";
    }
}
